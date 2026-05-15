import Cart from "../components/Cart"

function CartPage({ carrito, eliminarDelCarrito, whatsappLink }) {
  return (
    <main className="pt-28">
      <Cart
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
        whatsappLink={whatsappLink}
      />
    </main>
  )
}

export default CartPage