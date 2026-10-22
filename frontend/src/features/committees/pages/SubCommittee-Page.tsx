import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import useGetSubCommittees from "../hooks/useGetSubCommittees";
import { ClientDataTable } from "@/components/shared/data-table";
import CreateSubCommitteeDialog from "../components/Create-Sub-Committee-Dialog";
import { subcommitteeDataTableColumns } from "../components/SubCommittee-Columns";

export default function SubCommitteePage() {
  const { data, isPending } = useGetSubCommittees();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Sub-Committee"
          description="Manage organization sub-committees."
        />
        <CreateSubCommitteeDialog />
      </PageHeader>
      <PageSection>
        <ClientDataTable
          data={data}
          columns={subcommitteeDataTableColumns}
          isLoading={isPending}
          searchColumn="name"
        />
      </PageSection>
    </PageLayout>
  );
}
