import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import useGetOrgMembers from "../hooks/useGetOrgMembers";
import { ClientDataTable } from "@/components/shared/data-table";
import CreateOrgMemberDialog from "../components/Create-Org-Member-Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orgMemberDataTableColumns } from "../components/table/org-member/Org-Member-Columns";

export default function UserPage() {
  const { data, isPending } = useGetOrgMembers();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="User" description="Manage organization users." />
      </PageHeader>

      <div className="px-10">
        <Tabs defaultValue="orgMember" className="w-full">
          <TabsList>
            <TabsTrigger value="orgMember">Organization Members</TabsTrigger>
            <TabsTrigger value="operator">Operators</TabsTrigger>
          </TabsList>
          <TabsContent value="orgMember" className={"flex flex-col"}>
            <div className="self-end">
              <CreateOrgMemberDialog />
            </div>
            <PageSection>
              <ClientDataTable
                columns={orgMemberDataTableColumns}
                isLoading={isPending}
                data={data}
                searchColumn="name"
              />
            </PageSection>
          </TabsContent>
          <TabsContent value="operator">Change your password here.</TabsContent>
        </Tabs>

        {/* {data && (
          <CommitteeDataTable columns={committeeDataTableColumns} data={data} />
        )} */}
      </div>
    </PageLayout>
  );
}
