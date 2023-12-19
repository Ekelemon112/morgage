// const greeting = document.querySelector('.hello_world')

// greeting.innerHTML = "Hello Solomon"

// console.log(greeting);

// const low = document.querySelector("#world")
// low.innerHTML = "Hello Solomon, Hope you are good"
// console.log(low);

// const div1 = document.querySelector('#div_1')
// const div2 = document.querySelector('#div_2')
// const div3 = document.querySelector('#div_3')
// const h1_1 = document.querySelector('.Lorem1')
// const h1_2 = document.querySelector('.Lorem2')
// const h1_3 = document.querySelector('.Lorem3')

// h1_1.addEventListener('click', (e) => {
//     div1.setAttribute('class', 'non_visible')
//     div2.setAttribute('class', 'visible')
// })

// h1_2.addEventListener('click', (e) => {
//     div2.setAttribute('class', 'non_visible')
//     div3.setAttribute('class', 'visible')
// })

// h1_3.addEventListener('click', (e) => {
//     div3.setAttribute('class', 'non_visible')
//     div1.setAttribute('class', 'visible')
// })

// const getMortgageApi = async(amount, interest_rate, duration_year) => {
//     try {
//         const res = await fetch(`https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${amount}&interest_rate=${interest_rate}&duration_year=${duration_year}`,{
//             headers: { 'X-Api-Key': '/mRpr2ctgJnaW9FrSsO/Zw==xAida9CNEGIOHRNW'},
//             contentType: 'application/json',
//         })
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error);
//     }
// }

// getMortgageApi(30000000,3.5, 30)



// DISPLAY CONTENT
const displayContent = document.getElementById('diplay_content')

// FORMS
const form = document.getElementById('form')
const amount = document.getElementById('amount')
const interest_rate = document.getElementById('interest_rate')
const duration = document.getElementById('duration')
const calculate = document.getElementById('calculate')

// MONTHLY PAYMENT
const mHoa = document.getElementById('m_hoa_amount')
const mMortgage = document.getElementById('m_mortgage_amount')
const mHome = document.getElementById('m_home_amount')
const mProperty = document.getElementById('m_property_amount')
const mTotal = document.getElementById('m_total_amount')

// ANNUAL PAYMENT
const aHoa = document.getElementById('a_hoa_amount')
const aMortgage = document.getElementById('a_mortgage_amount')
const aHome = document.getElementById('a_home_amount')
const aProperty = document.getElementById('a_property_amount')
const aTotal = document.getElementById('a_total_amount')

// TOTAL
const total = document.getElementById('total_amount')



// FETCHING DATA FROM API
const getMortgageApi = async(amount, interest_rate, duration_years) => {
    try {
        const res = await fetch(`https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${amount}&interest_rate=${interest_rate}&duration_years=${duration_years}`,{
            headers: { 'X-Api-Key': '/mRpr2ctgJnaW9FrSsO/Zw==xAida9CNEGIOHRNW'},
            contentType: 'application/json',
        })

        const data = await res.json()
        return data
    } catch (error) {
        alert(error)
    } 
}




calculate.addEventListener('click',async(e)=>{
    calculate.textContent = "Loading..."
    e.preventDefault()
    if(amount.value === "" && interest_rate.value === "" && duration.value === ""){
    calculate.textContent = "Calculate"
    alert("Input field can not be empty")
    }else{
    const data =  await getMortgageApi(amount.value, interest_rate.value, duration.value)
        console.log(data)
    if(data){
    const {annual_payment, monthly_payment, total_interest_paid} = data  

    displayContent.setAttribute('id', "")
    //  MONTHLY PAYMENT
    mHoa.textContent = `$${monthly_payment.hoa}`
    mMortgage.textContent = `$${monthly_payment.mortgage }`
    mHome.textContent = `$${monthly_payment.annual_home_ins}`
    mProperty.textContent = `$${monthly_payment.property_tax}`
    mTotal.textContent = `$${monthly_payment.total}`

    // ANNUAL PAYMENT
    aHoa.textContent = `$${annual_payment.hoa}`
    aMortgage.textContent = `$${annual_payment.mortgage}` 
    aHome.textContent = `$${annual_payment.home_insurance}`
    aProperty.textContent = `$${annual_payment.property_tax}`
    aTotal.textContent = `$${annual_payment.total}`

    // OVERALL TOTAL
    total.textContent = `$${total_interest_paid}`

    }else {
        alert('something went wrong while fetching data')
    }
    form.reset()
    calculate.textContent = "Calculate"
    console.log('clicked')
    } 

})