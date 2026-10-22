import { Button } from "@/components/ui/button";
import getFormattedDateTime from "@/lib/formatDateTime";
import useGetMyOrganization from "../hooks/useGetMyOrganization";
import { Edit2, EditIcon, Mail, MapPin, Phone } from "lucide-react";

export default function OrganizationProfile() {
  const { data } = useGetMyOrganization();

  if (!data) return "No organization found!";

  return (
    <div className="relative ">
      <img
        src="https://wallpapercave.com/wp/wp2752752.jpg"
        className="w-full aspect-6/1.5 object-cover rounded-lg border bg-muted shadow-sm"
      />

      <Button variant={"outline"} className="absolute top-2 right-2">
        <EditIcon className="size-4" /> Change Image
      </Button>

      <div className="absolute w-full h-full top-0 bg-linear-180 from-transparent to-primary rounded-lg p-5 flex flex-col justify-end">
        <div className="flex flex-col gap-5">
          {/* top heading  */}
          <div className="text-gray-50">
            <p className="font-black text-3xl">{data.name}</p>
            <div className="text-lg flex flex-row gap-3 items-center">
              <MapPin className="size-4" /> <span>{data.address}</span>
            </div>
          </div>

          {/* bottom info  */}
          <div className="text-gray-200 flex flex-row gap-6 items-center text-sm">
            <div className="flex flex-row gap-3 items-center">
              <Phone className="size-4" /> <span>{data.phoneNumber}</span>
            </div>

            <div className="flex flex-row gap-3 items-center">
              <Mail className="size-4" /> <span>{data.email}</span>
            </div>

            <div className="space-x-1">
              <span>Joined -</span>
              <span>{getFormattedDateTime(new Date(data.createdAt))}</span>
            </div>
          </div>

          <div className="self-end absolute bottom-5">
            <Button variant={"outline"}>
              <Edit2 className="size-4" /> <span>Update</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
