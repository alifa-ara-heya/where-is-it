import { useState } from "react";
import Heading from "./Heading"; // Assume you have a reusable heading component

const FAQ = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const faqData = [
        {
            id: 1,
            question: "What is WhereIsIt?",
            answer:
                "WhereIsIt is a platform that helps people reconnect with their lost belongings or claim items they’ve found.",
        },
        {
            id: 2,
            question: "How do I post a lost or found item?",
            answer:
                "You can post a lost or found item by clicking on the 'Add Item' button, filling out the form with item details, and submitting it.",
        },
        {
            id: 3,
            question: "Is WhereIsIt free to use?",
            answer: "Yes, WhereIsIt is completely free to use for all users.",
        },
        {
            id: 4,
            question: "How do I recover an item?",
            answer:
                "If you find your item on the platform, click the 'This is Mine' or 'Found This' button and follow the steps to mark it as recovered.",
        },
        {
            id: 5,
            question: "Is my data secure on this platform?",
            answer:
                "Yes, we prioritize your privacy and security. All data is encrypted and securely stored.",
        },
    ];

    const toggleQuestion = (id) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div className="w-11/12 mx-auto max-w-[1440px] py-10">
            <Heading
                title="Frequently Asked Questions"
                subtitle="Got questions? We’ve got answers! Here are some of the most frequently asked questions about WhereIsIt."
            />

            <div className="space-y-4 mt-8">
                {faqData.map((faq) => (
                    <div
                        key={faq.id}
                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-transform duration-300"
                    >
                        <button
                            className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800"
                            onClick={() => toggleQuestion(faq.id)}
                        >
                            {faq.question}
                            <span className={`transition-transform duration-300 ${activeQuestion === faq.id ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </button>

                        {activeQuestion === faq.id && (
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
