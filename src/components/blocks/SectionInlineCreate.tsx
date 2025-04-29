import { useState } from "react";
import SectionForm from "./SectionForm";
import { Section } from "@/db/models";
import SectionRepository from "@/db/repositories/SectionRepository";

type Props = {
  section?: Partial<Section>;
};

export default function SectionInlineCreate({ section }: Props) {
  const [isAdding, setIsAdding] = useState(false);

  const onSectionCreate = async (data: Section) => {
    console.log({ data });
    await SectionRepository.save(data);
    setIsAdding(false);
  };
  return (
    <>
      {isAdding ? (
        <div className="pt-4 pb-2">
          <SectionForm
            section={section}
            onSubmit={onSectionCreate}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      ) : (
        <AddSectionButton onClick={() => setIsAdding(true)} />
      )}
    </>
  );
}

function AddSectionButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="my-4 flex cursor-pointer items-center justify-center text-gray-500 opacity-0 transition-opacity hover:opacity-100"
      onClick={onClick}
    >
      <div className="h-[1px] flex-1 bg-gray-300"></div>
      <span className="block px-4 text-xs font-medium">Add section</span>
      <div className="h-[1px] flex-1 bg-gray-300"></div>
    </div>
  );
}
