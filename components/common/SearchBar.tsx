"use client"

import {FC, FormEventHandler, useState} from "react";
import {FiSearch} from "react-icons/fi";
import ModalContainer from "components/ui/ModalContainer";
interface Props {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<Props> = ({onSubmit}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(query);
    setOpenModal(false)
    setQuery("")
  };

  return (
    <>
      <FiSearch size={28} className="cursor-pointer text-primary-dark" onClick={()=>setOpenModal(true)}/>
        
      <ModalContainer visible={openModal} onClose={()=>{
        setOpenModal(false)
        setQuery("")
      }}>
        <div className="bg-white drop-shadow-2xl flex flex-col justify-center items-center p-16 lg:w-1/2 lg:h-1/2 w-full min-h-[400px]">
          <form onSubmit={handleSubmit} className="flex items-center p-10">
            <input
              placeholder="Search..."
              type="text"
              autoFocus
              className="text-2xl ml-2 border-b-2 bg-transparent border-secondary-dark p-2 text-primary-dark focus:border-primary-dark dark:focus:border-primary outline-none transition"
              value={query}
              onChange={({target}) => setQuery(target.value)}
            />
          </form>
        </div>
      </ModalContainer>
    </>
  );
};

export default SearchBar;
