export interface FeedbacksCreateData{
  type: string
  comments: string
  screenshots?: string
}

export interface FeedbacksRepository {
  create: (data: FeedbacksCreateData) => Promise<void>;

}