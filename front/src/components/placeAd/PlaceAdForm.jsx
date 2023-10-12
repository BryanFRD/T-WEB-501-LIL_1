import React from 'react';

const PlaceAdForm = () => {
    return (
        <div className='w-11/12 shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
        flex text-center gap-5 flex-col
        '>
            <h1 className='text-xl'><strong>Déposer votre annonce</strong></h1>
            <div>
                <form>
                    <div className='flex gap-2'>
                        <label for='title'>Titre de votre annonce :</label>
                        <input className='' type='text' id='title' required />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlaceAdForm;