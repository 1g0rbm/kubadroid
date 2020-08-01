import {Request, Response, Router} from 'express'

const broadcastRouter: Router = Router()

broadcastRouter.post(
  '/list',
  [],
  async (req: Request, res: Response) => {

  })

export default broadcastRouter