const User = require("../models/User");
const xlsx = require("xlsx")
const Income = require("../models/Income");
const { json } = require("express");

//add income
exports.addIncome = async (req, res) => {
  const userId = req.user.id; // req.user mera protect middleware se aayega jismai user ka saara login data pdha hai like id email profilePic except pass

  try {
    const { icon, source, amount, date } = req.body;

    //validation check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json({ newIncome });
  } catch (err) {
    res.status(500).json({ message: "Server Error! " });
  }
};

//get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

//download excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    
    try{
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'Income_details.xlsx');
        res.download('income_details.xlsx');
    } catch(err){
        res.status(500).json({ message: "Server Error!"})
    }
};

//delete income
exports.deleteIncome = async (req, res) => {
    let { id } = req.params;
    try{
        await Income.findByIdAndDelete(id);
        res.json({ message: "Income Deleted Successfully"});
    } catch(err){
        res.status(500).json({ message: "Server Error!"});
    }
};
