import { create } from "zustand";

export const useProductStore= create((set)=> ({
   products: [],
   setProducts: (products) => set({products}) ,
   createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.image || !newProduct.price){
        return {success:false, message:"please fill in all fields."}
    }
    // API request -fetch API- in our case calls REST API in the backend
    const res = await fetch("/api/products", {
        method: "POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(newProduct)
    });
    const data = await res.json();
    set((state)=> ({products:[...state.products, data.data]}));
    return {success:true, message:"product created successfully"}

   },
   fetchProducts: async ()=> {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({products: data.data})
   },
   deleteProduct: async (pid) =>{
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        } );
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
       //this line is for updating the UI immediately without needing refresh
        set( state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success:true, message: data.message}
   },
   updateProduct: async (pid, updatedProduct) =>{
        const res = await fetch(`/api/products/${pid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });
        const data= await res.json();
        if(!data.success) return {success: false, message: data.message};
            //updating UI immediately without needing a refresh
        set((state)=>({
            products: state.products.map(product => product._id === pid ? data.data: product)
        }))
        return {success: true, message:data.message}
   }

})) //({}) in js that means you are returning an object