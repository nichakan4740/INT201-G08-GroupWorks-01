import { addProduct } from "./productCart";
import { updateDarkMode } from "./darkMode.js";
import { products } from "./products.js"; //import product.js ที่เก็บเป็น Array
const productList = document.querySelector("#product-container"); //สร้างเพื่อเชื่อมไปที่หน้า index.html
 
// สร้างฟังก์ชั่น createProductList เพื่อสร้าง Product
export function createProductList() {
 products.forEach((product, index) => {
   //ใช้ forEach เพื่อนำค่าใน products มาใช้ โดยวิธีการ loop ข้อมูล
   const productItem = document.createElement("div"); //สร้าง Element
   productItem.setAttribute("id", `ITEM${index + 1}`); //set id
   const productName = document.createElement("h3"); //ชื่อของ product
   const productID = document.createElement("p"); //id ของ product
   const price = document.createElement("p"); //ราคาสินค้า
   const stocks = document.createElement("p"); //stock ของสินค้า
   const image = document.createElement("img"); //รูปของ product
   const buyBtn = document.createElement("img"); //ปุ่มซื้อ (ใช้รูปรถเข็น)
   const buyBtnBG = document.createElement("div"); //พื้นหลังไอคอนรถเข็น(สีฟ้า)
   const info = document.createElement("div"); //สร้างเพื่อคลุม productName, price, stocks
   const infoWrap = document.createElement("div"); //สร้างเพื่อคลุม info และ buyBtn
 
   productName.textContent = product.productName; //นำชื่อจาก products มาใส่ใน productName
   productID.textContent = product.productId; //นำ id จาก products มาใส่ใน productID
   price.textContent = `${product.price} ฿`; //นำ price จาก products มาใส่ใน price
   stocks.textContent = `Stocks: ${product.stocks}`; // นำค่า stocks จาก products มาใส่ใน stocks
   image.src = product.image; //นำ src(link) ของรูปจาก products มาใส่ใน image
   buyBtn.src = "../img/cart.png"; //เอารูปรถเข็นมาใส่ใน buyBtn
   productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
   info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
   info.appendChild(price); //เพิ่ม price เข้าไปใน div ของ info
   info.appendChild(stocks); //เพิ่ม stocks เข้าไปใน div ของ info
   buyBtnBG.appendChild(buyBtn); //เพิ่ม buyBtn เข้าไปใน div ของ buyBtnBG
   infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
   infoWrap.appendChild(buyBtnBG); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
   productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
   productList.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList
   //ซึ่งตรงกับไอดี product-container ที่เราดึงมา
 
 
 
   //ตกแต่ง css ด้วย framework tailwind
   productItem.className =
     "productItem rounded-lg w-full flex flex-col justify-center bg-white";
   image.className =
     "rounded-t-lg product-img object-center object-cover h-auto w-full";
   productName.className =
     "truncate text-gray-700 text-sm md:text-lg mt-2 font-bold mb-2 ml-3";
   price.className = "text-md sm:text-3xl -mt-2 text-blue-600 ml-3";
   stocks.className = "text-gray-700 text-xs ml-3";
   buyBtn.className = "buyBtn w-5/12 pt-5 m-auto";
   buyBtnBG.className =
     "buyBtnBG rounded-br-lg bg-blue-500 hover:bg-blue-700 w-2/5";
   infoWrap.className = "flex justify-between";
   info.className = "pb-2 md:pb-4 w-36";
   updateDarkMode(); //เรียกใช่ darkMode
 
   // event เพิ่มสินค้าลงตะกร้า
   buyBtnBG.addEventListener("click", () => {
     //เพิ่ม event ให้กับปุ่มเพื่อเป็นการส่งข้อมูลเพื่อเก็บข้อมูลไว้ใน cart
     if (product.stocks > 0) {
       addProduct(product); //เรียกใช้ function addProduct ทำการ add สินค้าลง cart
       product.stocks -= 1;
       stocks.textContent = `Stocks: ${product.stocks}`; //ทำการเเก้ไขจำนวน stock เมื่อทำการคลิก event
     }
   });
 });
}
 
//สร้าง function showAllProduct เพื่อโชว์ product ทั้งหมด
export function showAllProducts() {
 products.forEach((product, index) => {
   let productItem = document.querySelector(`#ITEM${index + 1}`);
   if (productItem.classList.contains("hidden"))
     //เช็คว่ามี hidden อยู่ใน class ไหม
     productItem.classList.remove("hidden"); //ถ้ามี hidden ก็ลบออกให้หมด
 });
}
 

//เพิ่ม function searchProduct เพื่อทำการหาสินค้า
export function searchProduct(search) {
 //รับคำจากการ search เข้ามา
 products.forEach((product, index) => {
   //เอาตัวที่เลือกมาเช็ค
   const productItem = document.querySelector(`#ITEM${index + 1}`); //เชื่อม id ของ item ชิ้นที่1
   if (product.productName.toLowerCase().includes(search.toLowerCase())) {
     //เช็คว่าตรงกับคำที่ search มั้ยที่ user พิมพ์มา
     if (productItem.classList.contains("hidden"))
       //เช็คว่ามี hidden อยู่ใน class ไหม
       productItem.classList.remove("hidden"); //ถ้ามี hidden ก็ลบออกให้หมด
   } else {
     if (!productItem.classList.contains("hidden"))
       //เช็คก่อนว่าการค้นหานั้นตรงกันมั้ย
       productItem.classList.add("hidden"); //ซ่อนการค้นหาที่ไม่ตรงกับข้อมูลที่มีอยู่
   }
 });
}
 