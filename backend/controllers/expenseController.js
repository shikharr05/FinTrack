const Expense = require("../models/Expense")
const xlsx = require('xlsx');

//add expense 
exports.addExpense = async (req, res) => {
    let userId = req.user.id;

    try{
        let { icon, category, amount, date} = req.body;

        //validate missing field
        if(!category || !amount || !date){
            return res.status(400).json({ message: "All fields required!"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch(err) {
        res.status(500).json({ message: "Server Error!"});
    }
};

// get all expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch(err) {
        res.status(500).json({ message: "Server Error!"});
    }
};

// delete expense
exports.deleteExpense = async (req, res) => {
    let { id } = req.params;

    try{
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense deleted successfully!"})
    } catch(err) {
        res.status(500).json({ message: "Server Error!"});
    }
};

//download expense excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        //prepare date for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "Expense_details.xlsx");
        res.download('Expense_details.xlsx');
    } catch(err) {
        res.status(500).json({ message: "Server Error!"});
    }
}
