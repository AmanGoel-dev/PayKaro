import express from "express";
import z from "zod";
const app = express();
import db from "@repo/db/client";
app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
  //one transaction at one time only
  const bodySchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string(),
  });

  const PaymentInfo = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  const ValidSchema = bodySchema.safeParse(PaymentInfo);
  console.log(req.body);
  if (ValidSchema.success) {
    try {
      const checkstatus = await db.onRampTransaction.findUnique({
        where: {
          token: PaymentInfo.token,
        },
      });
      console.log(checkstatus?.status);
      if (checkstatus?.status == "Success") {
        return res.status(500).json({
          message: "request already fullfiled",
        });
      }
      await db.$transaction([
        db.balance.upsert({
          where: {
            userId: Number(PaymentInfo.userId),
          },
          update: {
            amount: {
              increment: Number(PaymentInfo.amount),
            },
          },
          create: {
            amount: Number(PaymentInfo.amount),
            locked: 0,
            user: {
              connect: {
                id: Number(PaymentInfo.userId),
              },
            },
          },
        }),
        db.onRampTransaction.update({
          where: {
            token: PaymentInfo.token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);
      res.status(200).json({
        message: "captured",
      });
    } catch (e) {
      console.log(e);
      res.status(411).json({
        message: "error while processing webhook request",
      });
    }
  } else {
    res.json({
      message: "invalid argument types",
    });
  }
});

app.listen(3003);
