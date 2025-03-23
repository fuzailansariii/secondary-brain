"use client";
import CardData from "@/components/CardData.";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/CustomDialog";
import ContentModel from "@/components/ContentModel";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl my-16">
      <div className="flex justify-between items-center mr-5">
        <h1 className="text-2xl md:text-3xl font-bold my-10 ml-5">All Items</h1>
        <div className="flex gap-4">
          <Button variant={"outline"}>Share</Button>

          {/* Popup model to add content */}
          <CustomDialog
            trigger={<Button variant={"default"}>Create</Button>}
            title="Add to Secondary Brain"
            description="Paste your link and select type."
          >
            <ContentModel
              inputFields={[
                { name: "title", placeholder: "Enter Title", type: "text" },
                {
                  name: "link",
                  placeholder: "Enter YouTube or Twitter Link",
                  type: "text",
                },
              ]}
              selectTitle="Select Type"
              selectOptions={["Youtube", "Tweet", "Article"]}
            />
          </CustomDialog>
        </div>
      </div>
      {/* Rendering Data in card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center gap-8">
        <CardData
          type="Youtube"
          title="Youtube Embed"
          link="https://youtu.be/ofHGE-85EIA?si=hUsGrtMPdkl3squD"
        />
        <CardData
          type="Tweet"
          title="Tweet Embed"
          link="https://x.com/fuzail_ansarii/status/1840449980156514633"
        />
      </div>
    </div>
  );
}
