export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        <p className="text-lg text-black dark:text-gray-400 mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <a href="mailto:jatin@example.com" className="px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors inline-block">
          Say Hello
        </a>
      </div>
    </section>
  );
}
