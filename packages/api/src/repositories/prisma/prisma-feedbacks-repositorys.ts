import { prisma } from "../../prisma";
import { FeedbacksCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type, comments, screenshots}: FeedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comments,
        screenshots,
      }
    })
  }
}