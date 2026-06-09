import { useAccount, useDisconnect } from "wagmi";
import { rabbykit } from "~/root";
import { Button } from "./ui/button";
import { confluxESpace } from "viem/chains";

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  //   console.log(isConnected);
  return (
    // <Button
    //   onClick={() => {
    //     rabbykit.open();
    //   }}
    // >
    //   {isConnected ? (
    //     <Button onClick={() => disconnect()}>Disconnect</Button>
    //   ) : (
    //     "Connect"
    //   )}
    //   {/* {isConnected ? address : "Connect"} */}
    // </Button>

    <div>
      {isConnected ? (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <Button onClick={() => rabbykit.open()}>Connect</Button>
      )}
    </div>
  );
}
