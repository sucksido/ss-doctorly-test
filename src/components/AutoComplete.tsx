import { useRef, useState } from "react";
import Fuse from "fuse.js";
import medications from "../assets/medications.json";
import {
  AutoCompleteContainer,
  AutoCompleteList,
  AutoCompleteListItem,
} from "./styles";
const fuse = new Fuse(medications, {
  keys: ["name"],
});

export function AutoComplete(props: Props) {
  const { onChange: onAutoCompleteChange } = props;
  const [search, setSearch] = useState("");
  const [resultShown, setResultShown] = useState(true);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const previousSearchRef = useRef("");
  const list = fuse.search(triggerSearch ? search : previousSearchRef.current);
  const notEmpty = list.length > 0;
  const showList = resultShown && notEmpty;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTriggerSearch(true);
    setSearch(event.target.value);
    previousSearchRef.current = event.target.value;
  };

  const onItemClick = (el: ArrayElement<typeof medications>) => {
    setResultShown(false);
    setSearch("");
    onAutoCompleteChange?.(el);
  };

  const onFocus = () => {
    setResultShown(true);
    setSearch(previousSearchRef.current);
  };

  const onMouseOver = (el: ArrayElement<typeof medications>) => {
    setTriggerSearch(false);
    setSearch(el.name);
  };

  return (
    <AutoCompleteContainer>
      <input value={search} onChange={onChange} style={{width: "300px"}} onFocus={onFocus}></input>
      {showList && (
        <AutoCompleteList>
          {list.map((el) => (
            <AutoCompleteListItem
              key={el.item.pzn}
              onClick={() => onItemClick(el.item)}
              onMouseOver={() => onMouseOver(el.item)}
            >
              {el.item.name}
            </AutoCompleteListItem>
          ))}
        </AutoCompleteList>
      )}
    </AutoCompleteContainer>
  );
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

interface Props {
  onChange?: (element: ArrayElement<typeof medications>) => void;
}
