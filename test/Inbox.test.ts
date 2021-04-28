import "regenerator-runtime/runtime";
import * as ganache from "ganache-cli";
import Web3 from "web3";
const web3 = new Web3(ganache.provider());
import compiled from "../compile";
let accounts;
let inbox;
const initialMessage = "Hi there";
describe("Inbox", () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(compiled.abi)
      .deploy({
        data: compiled.evm.bytecode.object,
        arguments: [initialMessage],
      })
      .send({ from: accounts[0], gas: 1000000 });
  });
  it("deploys a contract", () => {
    expect(inbox.options).toHaveProperty("address");
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    expect(message).toEqual(initialMessage);
  });
  it("can change the message", async () => {
    const newMessage = "Bye!";
    await inbox.methods.setMessage(newMessage).send({
      from: accounts[0],
    });
    const message = await inbox.methods.message().call();
    expect(message).toEqual(newMessage);
  });
});
