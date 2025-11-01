const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Get current user's cart
router.get("/", protect, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId",
    "name price discount images"
  );
  if (!cart) {
    return res.json({
      cart: { items: [], totalAmount: 0, userId: req.user._id },
    });
  }
  cart.totalAmount = cart.items.reduce(
    (sum, it) => sum + it.quantity * it.price,
    0
  );

  await cart.save();

  res.json({ cart });
});

// Add/update cart item
// router.post("/items", protect, async (req, res) => {
//   const { productId, quantity = 1 } = req.body;
//   const product = await Product.findById(productId);
//   if (!product) return res.status(404).json({ error: "Product not found" });
//   let cart = await Cart.findOne({ userId: req.user._id });
//   if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

//   const idx = cart.items.findIndex((i) => i.productId.toString() === productId);
//   if (idx > -1) {
//     cart.items[idx].quantity = quantity;
//     cart.items[idx].price = product.price;
//   } else {
//     cart.items.push({ productId, quantity, price: product.price });
//   }
//   cart.totalAmount = cart.items.reduce(
//     (s, it) => s + it.quantity * it.price,
//     0
//   );
//   await cart.save();

//   const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
//     "items.productId",
//     "name price discount images"
//   );

//   console.log("Sending cart:", JSON.stringify(updatedCart, null, 2));

//   res.json({ cart: updatedCart });
// });

router.post("/items", protect, async (req, res) => {
  try {
    console.log("➡️  POST /items called");
    console.log("Body:", req.body);
    console.log("User:", req.user?._id);

    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      console.log("❌ Product not found:", productId);
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    console.log("🛒 Found existing cart?", !!cart);

    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const idx = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );
    console.log("🧩 Found item index:", idx);

    if (idx > -1) {
      cart.items[idx].quantity = quantity;
      cart.items[idx].price = product.price;
      console.log("🔁 Updated quantity to", quantity);
    } else {
      cart.items.push({ productId, quantity, price: product.price });
      console.log("➕ Added new item");
    }

    cart.totalAmount = cart.items.reduce(
      (s, it) => s + it.quantity * it.price,
      0
    );
    await cart.save();
    console.log("💾 Cart saved");

    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "name price discount images"
    );

    console.log("✅ Sending cart:", JSON.stringify(updatedCart, null, 2));
    res.json({ cart: updatedCart });
  } catch (err) {
    console.error("🔥 Error in /items:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// Remove item
router.delete("/items/:productId", protect, async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  cart.totalAmount = cart.items.reduce(
    (s, it) => s + it.quantity * it.price,
    0
  );
  await cart.save();
  res.json({ cart });
});

module.exports = router;
