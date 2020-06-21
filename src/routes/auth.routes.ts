import { Router } from 'express'

const authRouter: Router = Router()

authRouter.post('/register', async (req, res) => {
  try {

  } catch (e) {
    res
      .status(500)
      .json({
        message: 'Something went wrong. Try again later'
      })
  }
})

authRouter.post('/register', (req, res) => {

})

export default authRouter