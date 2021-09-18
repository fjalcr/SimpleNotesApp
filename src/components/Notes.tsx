import { useState, createRef, KeyboardEvent } from 'react';

interface INotes{
	text: string;
}

export const Notes = () => {
	const [notes, setNotes] = useState<INotes[]>([]);
	const [input, setInput] = useState<string>('');
	const inputRef = createRef<HTMLInputElement>();
	const addNote = ():void =>{
		if(input.length > 0){
		setNotes([...notes,{'text': input}]);
		setInput('');
		if(inputRef.current){
			inputRef.current.focus();
		}	
		}
	}
	const remove = (element:number):void => {
		let newSavedNotes:INotes[] = notes.filter((val,index) => {
			if(index != element){
				return {text:val}
			}
		})
		
		setNotes(newSavedNotes)
	}
	
	const keyHandle = (e:KeyboardEvent<HTMLInputElement>):void => {
		if(e.key === 'Enter'){
			addNote()
		}	
	}
	
	return(
		<>
			<div className="flex flex-col w-full text-center">
				<p className="text-lg mb-2">Add new</p>	
				<div className="flex flex-row w-1/2 mx-auto">
				<input onKeyDown={keyHandle} value={input} ref={inputRef} onChange={(e:any) => setInput(e.target.value)} className="flex-1 py-2 px-4 border border-blue-500 rounded-full focus:outline-none focus:shadow-lg" placeholder="Add something awesome." />
				  <button className="bg-blue-500 text-white px-4 ml-4 rounded-full" onClick={addNote}>+</button>
				</div>	
				{notes.length > 0 && (
				<div className="flex flex-col w-1/2 mx-auto border border-blue-400 mt-6 px-4">
					{
					  notes.map((note,index)=>(
						  <div className="flex flex-row my-2 text-left">
						  <button onClick={() => remove(index)} className="bg-red-600 text-white px-2 mr-2 rounded-full">-</button>
						  <p className="flex-1" key={index}>{note.text}</p>
						  </div>
					  ))
					}

				</div>	

				)}
			</div>
		</>

	)
}
export default Notes ;
