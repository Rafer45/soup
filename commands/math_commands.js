
module.exports = {
    RPNcalculate: (message, _, msg, ...tokens) => {
        if (!msg) {
            message.channel.send('Provide a mathematical expression in Reverse Polish Notation with only "+" or "*"\n'
                + 'This is so restricted just because I\'m just trying it out');
        } else {
            let result;
            try {
                result = compute(tokens).toString();
            } catch (err) {
                if (err instanceof TypeError) {
                    result = 'bad input';
                } else {
                    throw err;
                }
            }
            message.channel.send(result);
        }

        function compute(tkns) {
            const stack = [];
            const operators = {
                '*': (a, b) => a * b,
                '+': (a, b) => a + b,
            };

            tkns.forEach((token) => {
                if (!isNaN(token)) {
                    stack.push(+token);
                } else {
                    const result = operators[token](+stack.pop(), +stack.pop());
                    stack.push(result);
                }
            });

            return stack.pop();
        }
    },
};
