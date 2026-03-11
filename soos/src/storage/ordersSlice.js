import { createSlice } from '@reduxjs/toolkit';

const loadOrders = () => {
  try {
    const saved = localStorage.getItem('sos_orders');
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    return null;
  }
};

const initialState = {
  orders: loadOrders() || []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add order to the beginning of the list
      state.orders.unshift({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...action.payload
      });
      localStorage.setItem('sos_orders', JSON.stringify(state.orders));
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
      localStorage.setItem('sos_orders', JSON.stringify(state.orders));
    }
  }
});

export const { addOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
