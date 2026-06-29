import { Request, Response, NextFunction } from "express";

//--------------------------------------------------------------
export default (err: any, req: any, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err)
    return res.status(400).send(`Invalid JSON format in request body.`);

  next();
};
