const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard data
exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId)); // converts user id string to MongoDB Object Id

        //fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },   //matches with those whose user id gets matches
            { $group: { _id: null, total: { $sum: "$amount" } } }, // group those and gets the total
        ]);

        // console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
             { $group: {_id: null, total: { $sum: "$amount" } } },
        ]);

        // console.log("totalExpense", {totalExpense, userId: isValidObjectId(userId)});

        //get income transactions for last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total income for 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //get expense transactions for last 60 days
        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total expense for 60 days
        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map( // used for combining the data of two arrays both of expense and income jb aage expense wala use hoga it will result into ..arr1, ...arr2 will result in dono ka data in a single array.
                (txn) => ({
                    ...txn.toObject(), //used for spreading mongoDb object into json object so that we can add the type in it and all fields are there with us
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);

        //final response
        res.json({
          totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
          totalIncome: totalIncome[0]?.total || 0,
          totalExpense: totalExpense[0]?.total || 0,
          last60DaysExpenses: {
            total: expenseLast60Days,
            transactions: last60DaysExpenseTransactions,
          },
          last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
          },
          recentTransactions: lastTransactions,
        });
    } catch(err){
        res.status(500).json({ message: "Server Error!", err})
    }
}