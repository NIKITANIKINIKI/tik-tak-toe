import { Cell } from "@/entities/game/domain";

export function Fields({ fields }: { fields: Cell[] }) {
  return (
    <div className="flex justify-center mt-5">
      <div className=" grid grid-cols-3 grid-rows-3 border-[5px] border-purple-500 rounded-lg shadow-lg">
        {fields.map((el) => (
          <div
            className={` flex justify-center items-center text-[35px] w-[100px] h-[100px] border border-purple-500 text-[25px] ${
              el === null
                ? "cursor-pointer hover:bg-purple-500 transition transform hover:scale-110 hover:rounded-lg"
                : ""
            }`}
          >
            {el ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
