import { db } from '@/db/drizzle';
import { NextRequest, NextResponse } from 'next/server';
import { NewAnnouncementType } from '@/db/dbTypes';
import { announcements } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    // get request body
    // if body not provided try block fails and move to catch block
    let body: NewAnnouncementType = await request.json();

    // boolean to represent if all necessary params are provided having correct data type
    const necessaryParams =
      typeof body.title === 'string' &&
      typeof body.description === 'string' &&
      typeof body.url === 'string' &&
      typeof body.createdBy === 'number' &&
      typeof body.updatedBy === 'number' &&
      typeof body.isGeneralAnnouncement === 'boolean' &&
      (!body.isForAllBatches || typeof body.isForAllBatches === 'boolean') &&
      (!body.isForAllCourses || typeof body.isForAllCourses === 'boolean') &&
      (!body.batchId || typeof body.batchId === 'number') &&
      (!body.courseId || typeof body.courseId === 'number') &&
      (!(body.isGeneralAnnouncement === false) ||
        typeof body.isForAllBatches === 'boolean' ||
        typeof body.isForAllCourses === 'boolean') &&
      (!(body.isForAllBatches === false) || typeof body.batchId === 'number') &&
      (!(body.isForAllCourses === false) || typeof body.courseId === 'number');

    if (necessaryParams) {
      const unnecessaryParams =
        body.announcementId ||
        body.createdOn ||
        (body.isGeneralAnnouncement === true &&
          (body.courseId ||
            body.isForAllCourses ||
            body.batchId ||
            body.isForAllBatches)) ||
        (body.isForAllBatches === true && body.batchId) ||
        (body.isForAllCourses === true && body.courseId);

      if (!unnecessaryParams) {
        // All necessary parameters are provided and there are no unnecessary parameters
        try {
          const response = await db
            .insert(announcements)
            .values(body)
            .onConflictDoNothing({
              target: [
                announcements.title,
                announcements.description,
                announcements.url,
                announcements.isGeneralAnnouncement,
                announcements.isForAllBatches,
                announcements.batchId,
                announcements.isForAllCourses,
                announcements.courseId,
              ],
            })
            .returning();
          if (response.length != 0) {
            return NextResponse.json(
              {
                success: true,
                data: response,
                message: 'New announcement added successfully',
              },
              { status: 200 }
            );
          } else {
            return NextResponse.json(
              {
                success: false,
                message: 'The announcement already exists',
              },
              { status: 409 }
            );
          }
        } catch (error) {
          let err = error as string;
          // Error occurred while attempting to place data it in the database
          return NextResponse.json(
            {
              success: false,
              error: err.toString(),
              message:
                'Unable to process the request: an error occurred while interacting with the database',
            },
            { status: 500 }
          );
        }
      } else {
        // Unnecessary parameters are provided
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid request body: unnecessary parameters provided',
          },
          { status: 400 }
        );
      }
    } else {
      // Necessary parameters are missing
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid request body: The request is missing necessary parameters or the parameter types are incorrect.',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // No request body provided
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body: unable to process the request',
      },
      { status: 400 }
    );
  }
}
