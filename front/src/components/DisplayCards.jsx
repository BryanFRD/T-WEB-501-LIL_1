import React from 'react';
import AdCards from './AdCards';

const TestData = [{
    id: 1, 
    title: 'TestTitle', 
    description: 'TestDescription', 
    status: 'OPEN', 
    contractTypes: [{name: 'CDI'}, {name:'CDD'}],  
    createdAt: 'Il y a {day}'

}, 
{
    id: 2, 
    title: 'TestTitle2', 
    description: 'fruygyufegfdsuygfsyufdsgfsuygfsuyygyfs fsyugfuyfgfsuygfsuyfsgfsuygfsuyfsgfsuygfsuygfs fsuygfyufgfsuygsfuyfsgfsuygfsuyfsgfsuygfsyufsgfs fsuygfsyufsgfsuygfyufsgfsuygfyufsgfsyugfs fsuygfyufsgdiuhqdioqdjdqiuhdqiudgqh', 
    status: 'OPEN', 
    contractTypes: [{name: 'CDI'}, {name:'CDD'}],  
    createdAt: 'Il y a {day}'

}, 
{
    id: 3, 
    title: 'TestTitle3', 
    description: 'fruygyufegfdsuygfsyufdsgfsuygfsuyygyfs fsyugfuyfgfsuygfsuyfsgfsuygfsuyfsgfsuygfsuygfs fsuygfyufgfsuygsfuyfsgfsuygfsuyfsgfsuygfsyufsgfs fsuygfsyufsgfsuygfyufsgfsuygfyufsgfsyugfs fsuygfyufsgdiuhqdioqdjdqiuhdqiudgqh', 
    status: 'OPEN', 
    contractTypes: [{name: 'CDI'}, {name:'CDD'}],  
    createdAt: 'Il y a {day}'   
}]

const DisplayCards = () => {
    return (
        <div className='flex flex-col pt-6 gap-3 text-center w-5/6
        md:grid md:grid-cols-3 md:w-11/12'>
            {TestData.map(data => (<AdCards ad={data}></AdCards>))}
        </div>
    );
};

export default DisplayCards;