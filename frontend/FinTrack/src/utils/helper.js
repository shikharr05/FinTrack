import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  if (password.length < minLength) {
    return {
      valid: false,
      message: "Password must be atleast 8 characters long",
    };
  }
  if (!hasUpperCase) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      message: "Password must contain at least one special character",
    };
  }
  return { valid: true, message: "Password is valid" };
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addHundredsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = new Intl.NumberFormat("en-IN").format(integerPart);

  return fractionalPart
    ? `${formattedInteger}. ${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item, index) => ({
    month: moment(item?.date).format("Do MMM"),
    category: item?.category,
    amount: item?.amount,
    uniqueId: index,
  }));

  return chartData;
};

export const prepareChartData = (data = []) => {
  const chartData = data.map((item) => ({
    name: item?.source, // yaha name rkhna islie jaroori hai kyuki pie chart mai hmne nameKey mai name rkha hai to islie name variable mai hi store krana pdega.
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item, index) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: Number(item?.amount),
    category: item?.source,
    uniqueId: index,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item, index) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: Number(item?.amount),
    category: item?.category,
    uniqueId: index,
  }));

  return chartData;
};
