import Contact from "../components/Contact"

function ContactPage({ whatsappNumber }) {
  return (
    <main className="pt-28">
      <Contact whatsappNumber={whatsappNumber} />
    </main>
  )
}

export default ContactPage