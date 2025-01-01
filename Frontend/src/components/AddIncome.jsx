import React, { useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import axios from 'axios';

const AddIncome = () => {
    const [amount, setAmount] = useState('');

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const handleIncomeSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/api/income/new', { amount });
            console.log(res.data);
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <div className='flex justify-center mt-8 min-h-full'>
            <Card className="w-96">
                <h3>Add New Income</h3>
                <form className="flex flex-col gap-4" onSubmit={handleIncomeSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount:" />
                        </div>
                        <TextInput
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    <Button type="submit">Add Income</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddIncome;
