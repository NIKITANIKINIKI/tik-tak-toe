import { Cell } from "@/entities/game/domain";
import cuid from "cuid";

export function Fields({
  fields,
  onClick,
}: {
  fields: Cell[];
  onClick?: (index: number) => void;
}) {
  const fieldWithKey = fields.map((el) => ({
    id: cuid(),
    field: el,
  }));

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="grid grid-cols-3 grid-rows-3 border-[5px] border-blue-700 rounded-lg shadow-lg">
        {fieldWithKey.map((el, index) => (
          <div
            onClick={() => onClick?.(index)}
            key={el.id}
            className={`flex justify-center items-center text-[35px] w-[100px] h-[100px] border border-blue-700 ${
              el.field === null
                ? "cursor-pointer hover:bg-blue-700 transition transform hover:scale-110 hover:rounded-lg"
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
