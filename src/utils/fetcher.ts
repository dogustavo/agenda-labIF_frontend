export class FetchError extends Error {
  statusCode: number
  response: Response

  constructor(
    message: string,
    statusCode: number,
    response: Response
  ) {
    super(message)
    this.statusCode = statusCode
    this.response = response
  }
}
