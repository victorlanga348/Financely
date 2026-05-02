import prisma from "../Services/db.js";

export const createTransition = async (req, res) => {
    const { description, amount, type, category, date } = req.body;
    const userId = req.userId;

    try {
        const transition = await prisma.transaction.create({
            data: {
                description,
                amount: Number(amount),
                type,
                category,
                date: new Date(date),
                userId
            }
        });

        res.json(transition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllTransitions = async (req, res) => {
    try {
        const transitions = await prisma.transaction.findMany({
            where: { userId: req.userId },
            orderBy: { date: "desc" },
        });
        res.json(transitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSummary = async (req, res) => {
    const userId = req.userId;

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
        });

        const totalIncome = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpenses;

        res.json({
            totalIncome,
            totalExpenses,
            balance
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}