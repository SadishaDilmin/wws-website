import SubNav from "@/components/SubNav";
import { roofingNav } from "@/lib/site";
export default function RoofingLayout({ children }: { children: React.ReactNode }) {
  return (<><SubNav title="WWS Roofing Products" items={roofingNav} />{children}</>);
}
