import logo from "./logo.svg";
import "./App.css";
import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { actions, utils, programs, NodeWallet } from "@metaplex/js";
function App() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const keypair = Keypair.generate();

  async function createAccount() {
    const feePayerAirdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(feePayerAirdropSignature);
    console.log("Account created");
    console.log("Public key:", keypair.publicKey.toBase58());

    const mintNFTResponse = await actions
      .mintNFT({
        connection,
        wallet: new NodeWallet(keypair),
        uri: "https://34c7ef24f4v2aejh75xhxy5z6ars4xv47gpsdrei6fiowptk2nqq.arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E",
        maxSupply: 1,
        symbol: "TEST",
        properties: {
          creators: [keypair.publicKey.toBase58()],
        },
        seller_fee_basis_points: 0,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        Hellos
        <button onClick={createAccount}>Create Account</button>
      </header>
    </div>
  );
}

export default App;
