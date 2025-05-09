import { Cell } from "@/entities/game/domain";
import cuid from "cuid";

export function Fields({ fields }: { fields: Cell[] }) {
  const fieldWithKey = fields.map((el) => ({
    id: cuid(),
    field: el,
  }));

  return (
    <div className="flex justify-center mt-5">
      <div className=" grid grid-cols-3 grid-rows-3 border-[5px] border-purple-500 rounded-lg shadow-lg">
        {fieldWithKey.map((el) => (
          <div
            key={el.id}
            className={` flex justify-center items-center text-[35px] w-[100px] h-[100px] border border-purple-500 text-[25px] ${
              el === null
                ? "cursor-pointer hover:bg-purple-500 transition transform hover:scale-110 hover:rounded-lg"
                : ""
            }`}
          >
            {el.field ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
function uuid(): any {
  throw new Error("Function not implemented.");
}
