import { Cl } from "@stacks/transactions";
import { beforeEach, describe, expect, it } from "vitest";

import { initSimnet } from "@hirosystems/clarinet-sdk";

describe("test token streaming contract", () => {
  let simnet: any;
  let sender: any;
  let recipient: any;
  let randomUser: any;

  // Before each test is run, we want to create a stream
  // so we can run tests around different possible things to do with the stream
  beforeEach(async () => {
    simnet = await initSimnet();
    // `simnet` is a "simulation network" - a local, testing Stacks node for running our tests
    const accounts = simnet.getAccounts();

    // The identifiers of these wallets can be found in the `settings/Devnet.toml` config file
    // You can also change the identifiers of these wallets in those files if you want
    sender = accounts.get("wallet_1")!;
    recipient = accounts.get("wallet_2")!;
    randomUser = accounts.get("wallet_3")!;

    const result = simnet.callPublicFn(
      "stream",
      "stream-to",
      [
        Cl.principal(recipient),
        Cl.uint(5),
        Cl.tuple({ "start-block": Cl.uint(0), "stop-block": Cl.uint(5) }),
        Cl.uint(1),
      ],
      sender
    );

    expect(result.events[0].event).toBe("stx_transfer_event");
    expect(result.events[0].data.amount).toBe("5");
    expect(result.events[0].data.sender).toBe(sender);
  });

  it("ensures test works", () => {
    expect(true).toBe(true);
  });
});
