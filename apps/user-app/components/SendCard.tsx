"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import p2ptransaction from "../app/lib/actions/p2ptransaction";

const SendCard = () => {
  const [number, setnumber] = useState("");
  const [amount, setamount] = useState("");
  return (
    <div className=" h-[90vh] ">
      <Card title="Send Money">
        <div className=" min-w-72">
          <TextInput
            placeholder={"9876543567"}
            label="Phone Number"
            onChange={(value) => {
              setnumber(value);
            }}
            value={number}
          />
          <TextInput
            placeholder={"Amount"}
            label="Amount"
            onChange={(value) => {
              setamount(value);
            }}
            value={amount}
          />
          <div className=" mt-4 flex justify-center">
            <Button
              onClick={async () => {
                const status = await p2ptransaction(
                  number,
                  Number(amount) * 100
                );
                setamount("");
                setnumber("");
                if (status.message == "payemnt success") {
                  alert("payment done successfully");
                } else if (status.message == "transaction failed") {
                  alert("sorry cant process transaction");
                } else if (status.message == "User Not Found") {
                  alert("invalid user");
                }
              }}
            >
              Send Money
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SendCard;
