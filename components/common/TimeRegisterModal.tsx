import {FC, useState} from "react";

import TimeField from "react-simple-timefield";
import {AiFillCaretDown} from "react-icons/ai";
import ModalContainer from "./ModalContainer";
import Dropdown from "./Dropdown";
import ActionButton from "./ActionButton";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleTimeRegister: (time: string, category: string) => void;
  loading: boolean;
};

const TimeRegisterModal: FC<Props> = ({
  isOpen,
  handleClose,
  handleTimeRegister,
  loading
}): JSX.Element => {
  const [time, setTime] = useState("00:00");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    handleTimeRegister(time, category);
    setTime("00:00");
    setCategory("");
  };

  const options = [
    {
      label: "leetcode",
      onClick: () => setCategory("leetcode"),
    },
    {
      label: "theory",
      onClick: () => setCategory("theory"),
    },
    {
      label: "system design",
      onClick: () => setCategory("system design"),
    },
    // leetcode 
    // js complex parts questions (https://www.notion.so/Front-End-Preparation-a0ac842415a04ddf9319718ea6ba22a4?pvs=4#d78cec6d98b64fd8be4f6f82f5fecaf7)
    // js coding questions (https://bigfrontend.dev/problem)
    // practical frontend exercises (https://frontendeval.com/)
    // system design (https://www.youtube.com/watch?v=5vyKhm2NTfw&list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT)
    // behavioural
  ];

  return (
    <ModalContainer visible={isOpen} onClose={handleClose}>
      <div className="bg-white drop-shadow-2xl flex flex-col py-16 lg:px-12 px-4 lg:w-1/2 lg:h-1/2 w-full min-h-[400px]">
        <div className="text-lg mb-12 font-semibold font-heading">
          New time record
        </div>
        <div className="flex flex-col justify-between  h-full min-h-[200px]">
          <div className="flex gap-x-10">
            <TimeField
              value={time}
              onChange={(event, value) => setTime(value)}
              style={{
                width: 80,
                padding: "8px 14px",
                border: "1px solid grey",
                borderRadius: 4,
              }}
            />
            <Dropdown
              options={options}
              head={(
                <div className="flex items-center justify-between space-x-2 text-primary-dark dark:text-primary border border-grey rounded px-[14px] py-[8px] w-60">
                  <p>{category || "Choose category"}</p>
                  <AiFillCaretDown />
                </div>
              )}
            />
          </div>

          <div className="flex items-center space-x-8 justify-end">
            <div className="w-32">
              <ActionButton onClick={handleClose} title="Cancel" />
            </div>
            <div className="w-32">
              <ActionButton
                onClick={handleSave}
                title="Save"
                disabled={!category}
                tip={!category ? "Please select a category" : ""}
                busy={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TimeRegisterModal;
