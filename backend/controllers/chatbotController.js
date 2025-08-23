const knowledgeBase = {
    "how do i register for an event?": "You can register for any upcoming event by clicking the 'Register' button on the event's detail page. You must be logged in as a Student to register.",
    "can i cancel my registration?": "Yes, you can cancel your registration at any time before the event starts. Go to your dashboard, find the event under 'My Events', and click the 'Unregister' button.",
    "how do i create an event?": "Event creation is restricted to users with the 'Organizer' role. If you are an organizer, you can create events from your admin dashboard.",
    "who can attend events?": "Most events are open to all students. Some events might have specific prerequisites or be limited in capacity, which will be mentioned in the event details.",
    "how do i become an organizer?": "You can apply to become an organizer by filling out the organizer registration form. Your application will be reviewed by a Super Admin.",
    "where can i see my registered events?": "You can see all the events you are registered for in the 'My Events' section of your personal dashboard.",
    "hello": "Hello! How can I help you with our event platform today?",
    "bye": "Goodbye! Feel free to ask if you have more questions."
};

const findResponse = (question) => {
    const q = question.toLowerCase().trim();
    if (knowledgeBase[q]) {
        return knowledgeBase[q];
    }
    if (q.includes('register')) return knowledgeBase['how do i register for an event?'];
    if (q.includes('cancel') || q.includes('unregister')) return knowledgeBase['can i cancel my registration?'];
    if (q.includes('create') || q.includes('add event')) return knowledgeBase['how do i create an event?'];
    if (q.includes('organizer')) return knowledgeBase['how do i become an organizer?'];
    if (q.includes('my events') || q.includes('see my events')) return knowledgeBase['where can i see my registered events?'];

    return "I'm sorry, I don't have an answer for that. Please try rephrasing your question or contact support for more complex issues.";
};

const getChatbotResponse = (req, res) => {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
        return res.status(400).json({ message: 'A non-empty question string is required.' });
    }
    const answer = findResponse(question);
    res.json({ answer });
};

module.exports = {
    getChatbotResponse,
};