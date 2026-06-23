import ExploreTools from "@/app/components/ExploreTools";
import { getDictionary } from "@/app/dictionaries";

export default async function ToolsLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <>
      {children}
      <div className="container" style={{ paddingBottom: '40px' }}>
        <ExploreTools lang={lang} dict={dict} />
      </div>
    </>
  );
}
