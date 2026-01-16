document.getElementById("order").addEventListener("click", async () => {
  const data = {
    name: "Ali",
    phone: "+998901234567",
    productName: "Xiaomi Air Purifier 4",
  };

  try {
    const response = await fetch("http://192.168.31.113:4000/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert("✅ Order sent successfully!");
    } else {
      alert("❌ Failed to send order");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("🚫 Serverga ulanishda xatolik");
  }
});
