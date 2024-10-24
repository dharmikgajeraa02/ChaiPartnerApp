import { ethers } from "ethers";
import "./Buy.css";

const Buy = ({ state }) => {
    const buyChai = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        // Set the transaction amount to a minimal value for testing
        const amount = { value: ethers.utils.parseEther("0.00001") }; // Adjust the amount as necessary

        try {
            const transaction = await contract.buyChai(name, message, {
                ...amount,
                gasLimit: ethers.utils.hexlify(300000), // Set a reasonable gas limit
                gasPrice: ethers.utils.parseUnits("10", "gwei") // Set a reasonable gas price
            });
            await transaction.wait();
            alert("Transaction is successful");
            window.location.reload();
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Check console for details.");
        }
    };

    return (
        <div className="center">
            <h1>Thanks</h1>
            <form onSubmit={buyChai}>
                <div className="inputbox">
                    <input type="text" required="required" id="name" />
                    <span>Name</span>
                </div>
                <div className="inputbox">
                    <input type="text" required="required" id="message" />
                    <span>Message</span>
                </div>
                <div className="inputbox">
                    <input type="submit" value="Pay" disabled={!state.contract} />
                </div>
            </form>
        </div>
    );
};

export default Buy;
