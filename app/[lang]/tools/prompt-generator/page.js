import { getDictionary } from "@/app/dictionaries";
import PromptGeneratorClient from "@/app/components/PromptGeneratorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/prompt-generator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/prompt-generator`,
        "ar": `https://smartcalctools.xyz/ar/tools/prompt-generator`,
      },
    },
    title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
    description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
    openGraph: {
      title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
      description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
      description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function PromptGeneratorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const faqs = isAr ? [
    {
      question: "ما هو مهندس ومولد الأوامر البرمجية للذكاء الاصطناعي؟",
      answer: "هو أداة متطورة تساعدك على صياغة أوامر (Prompts) دقيقة وفعالة لنماذج الذكاء الاصطناعي مثل ChatGPT و Claude و Gemini، وذلك بهدف الحصول على نتائج عالية الدقة وأكثر صلة بما تبحث عنه."
    },
    {
      question: "هل أحتاج لخبرة سابقة في هندسة الأوامر (Prompt Engineering) لاستخدام الأداة؟",
      answer: "لا، الأداة مصممة لتكون سهلة الاستخدام للمبتدئين والمحترفين على حد سواء. كل ما عليك هو إدخال الفكرة الأساسية، وستقوم الأداة بهيكلتها وتزويدها بالتفاصيل والسياق المناسب."
    },
    {
      question: "ما هي النماذج التي تدعمها هذه الأداة؟",
      answer: "يمكنك استخدام الأوامر الناتجة من أداتنا مع جميع نماذج اللغات الكبيرة (LLMs) مثل OpenAI GPT-4، و Anthropic Claude 3، و Google Gemini، وغيرها من النماذج المدعومة بالذكاء الاصطناعي."
    },
    {
      question: "هل تضمن لي هذه الأداة الحصول على إجابة صحيحة 100% من الذكاء الاصطناعي؟",
      answer: "الأداة تحسن بشكل كبير من جودة السؤال والسياق المقدم، مما يرفع من احتمالية الحصول على إجابة دقيقة ومفيدة بنسبة كبيرة، لكن النتيجة النهائية تعتمد دائماً على قدرات نموذج الذكاء الاصطناعي المستخدم."
    },
    {
      question: "لماذا أحتاج إلى أداة لكتابة أوامر الذكاء الاصطناعي بدلاً من كتابتها بنفسي؟",
      answer: "النماذج اللغوية تستجيب بناءً على السياق. كتابة أمر قصير كـ 'اكتب لي مقال' سيعطي نتيجة عامة وضعيفة. الأداة تساعدك على بناء هيكل (هندسة أوامر) يجمع بين الدور، والأسلوب، والصيغة لضمان مخرجات ذات جودة احترافية من المحاولة الأولى."
    },
    {
      question: "هل تدعم الأوامر المولدة نماذج محددة مثل ChatGPT فقط؟",
      answer: "لا، الأوامر المهندسة هنا متوافقة وتعمل بكفاءة عالية جداً مع جميع النماذج اللغوية الكبيرة (LLMs) مثل ChatGPT، و Google Gemini، و Claude، وغيرها."
    }
  ] : [
    {
      question: "What is an AI Prompt Builder and Generator?",
      answer: "It is an advanced tool that helps you craft precise and effective prompts for AI models like ChatGPT, Claude, and Gemini, aiming to yield highly accurate and relevant results."
    },
    {
      question: "Do I need prior experience in Prompt Engineering to use this tool?",
      answer: "No, the tool is designed for both beginners and professionals. You simply input your core idea, and the tool will structure it, adding the necessary details and context."
    },
    {
      question: "Which AI models are supported by the generated prompts?",
      answer: "You can use the resulting prompts with all Large Language Models (LLMs) including OpenAI GPT-4, Anthropic Claude 3, Google Gemini, and other AI-powered chat assistants."
    },
    {
      question: "Does this tool guarantee a 100% correct answer from the AI?",
      answer: "While the tool significantly improves the quality of your prompt and context, increasing the likelihood of an accurate response, the final output always depends on the capabilities of the specific AI model you are using."
    },
    {
      question: "Why do I need a tool to generate prompts instead of writing them myself?",
      answer: "AI models are highly sensitive to context and structure. A simple prompt like 'write an article' yields generic results. This tool builds a structured 'engineered prompt' combining persona, tone, and format to guarantee professional-grade outputs on the first try."
    },
    {
      question: "Are the generated prompts only for ChatGPT?",
      answer: "No, the prompts generated are universally optimized and will work exceptionally well on any Large Language Model (LLM) including ChatGPT, Google Gemini, Anthropic Claude, and Meta Llama."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator"}
        description={isAr ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini" : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini"}
        applicationCategory="UtilityApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/prompt-generator`}
      />
      <div className="page-header">
        <h1>{dict.prompt.title}</h1>
        <p>{dict.prompt.subtitle}</p>
      </div>
      <PromptGeneratorClient lang={lang} dict={dict} />
      
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>الدليل الشامل لاستخدام مهندس ومولد أوامر الذكاء الاصطناعي</h2>
            <p>
              في عصر التطور التكنولوجي المتسارع، أصبح التفاعل مع نماذج الذكاء الاصطناعي مثل <strong>ChatGPT</strong> و <strong>Claude</strong> و <strong>Gemini</strong> جزءاً أساسياً من عمل الكثيرين. إلا أن الحصول على إجابات دقيقة واحترافية من هذه النماذج يتطلب مهارة تُعرف باسم <em>هندسة الأوامر</em> (Prompt Engineering). وهنا يأتي دور أداتنا المتقدمة: "مهندس ومولد أوامر الذكاء الاصطناعي".
            </p>
            <p>
              تم تصميم هذه الأداة لتكون بمثابة جسر بين أفكارك وبين قدرات الذكاء الاصطناعي. سواء كنت كاتباً، مبرمجاً، مسوقاً، أو باحثاً، يمكنك ببساطة إدخال فكرتك الأساسية، وستقوم الأداة بتحويلها إلى أمر برمجي متكامل ومهيكل بأسلوب احترافي، يضمن لك استخراج أفضل أداء من نموذج الذكاء الاصطناعي المستهدف.
            </p>
            
            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>مبرمج يبحث عن حل لمشكلة:</strong> بدلاً من قول "حل مشكلة كذا"، جرب إعدادات الأداة: الدور (مهندس برمجيات)، المهمة (كتابة مكون تفاعلي)، التنسيق (خطوة بخطوة مع أمثلة الكود). النتيجة ستكون كوداً نظيفاً ومشروحاً بعناية.</li>
              <li style={{ marginBottom: "8px" }}><strong>مسوق يحتاج خطة إعلانية:</strong> اختر الدور (مخطط تسويقي)، المهمة (كتابة خطة إطلاق منتج)، الأسلوب (إبداعي)، والتنسيق (جدول بيانات). ستحصل على جدول زمني مفصل ومقسم بدلاً من نص سردي ممل.</li>
              <li style={{ marginBottom: "8px" }}><strong>كاتب محتوى لمقال أكاديمي:</strong> اختر الدور (عالم بيانات أو كاتب تقني)، الأسلوب (أكاديمي)، والمهمة (تلخيص ورقة بحثية). هذا سيجبر الذكاء الاصطناعي على تجنب اللغة التسويقية واستخدام مصطلحات رصينة.</li>
              <li style={{ marginBottom: "8px" }}><strong>محلل مالي يستعرض خيارات الاستثمار:</strong> اختر الدور (مستشار مالي)، المهمة (تقييم شراء أسهم مقابل عقار)، والتنسيق (المميزات والعيوب). ستحصل على مقارنة محايدة ودقيقة.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>مبادئ هندسة الأوامر (Prompt Engineering)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تم تصميم هذه الأداة بناءً على أفضل الممارسات في هندسة الأوامر والتي تشمل: إعطاء النموذج <strong>دوراً وشخصية</strong> لضبط المصطلحات، إضافة عبارة <strong>"فكر خطوة بخطوة" (Chain of Thought)</strong> لتقليل الهلوسات وتحسين المنطق، وتحديد <strong>هيكل واضح للمخرجات</strong> لتسهيل القراءة والنسخ.
            </p>

            <h3>لماذا تعتبر هندسة الأوامر (Prompt Engineering) حاسمة؟</h3>
            <p>
              نماذج الذكاء الاصطناعي تعمل كمرآة دقيقة للسؤال الذي يُطرح عليها. إذا كان السؤال عاماً أو غامضاً، فستكون الإجابة كذلك. من خلال هندسة الأوامر بشكل سليم، يمكنك تحديد:
            </p>
            <ul>
              <li><strong>السياق:</strong> توفير الخلفية اللازمة للنموذج ليفهم الغرض من السؤال.</li>
              <li><strong>الدور:</strong> تحديد الشخصية أو التخصص الذي يجب أن يتقمصه النموذج (مثال: خبير تسويق، مبرمج محترف).</li>
              <li><strong>التنسيق:</strong> تحديد شكل المخرجات المطلوبة (جدول، نقاط، فقرات، كود برمجي).</li>
            </ul>
            <p>
              باستخدام أداة توليد الأوامر الخاصة بنا، أنت توفر على نفسك ساعات من المحاولة والخطأ، وتحصل فوراً على صياغة مثالية تناسب متطلباتك الدقيقة.
            </p>
            <h3>كيفية تحقيق أقصى استفادة من مولد الأوامر</h3>
            <p>
              لتحقيق نتائج مبهرة، ننصحك دائماً بأن تكون واضحاً ومحدداً في وصفك المبدئي. اذكر السياق والهدف النهائي بوضوح. ستتكفل الأداة بإضافة المتغيرات وتنسيق الطلب بحيث يسهل على نماذج الذكاء الاصطناعي استيعابها وتنفيذها بدقة عالية. انطلق الآن وارتقِ بمستوى إنتاجيتك مع الذكاء الاصطناعي!
            </p>
          </>
        ) : (
          <>
            <h2>The Comprehensive Guide to the AI Prompt Builder & Generator</h2>
            <p>
              In today’s rapidly evolving digital landscape, interacting with artificial intelligence models like <strong>ChatGPT</strong>, <strong>Claude</strong>, and <strong>Gemini</strong> has become a daily routine for many. However, unlocking their full potential requires a specific skill known as <em>Prompt Engineering</em>. This is where our advanced "AI Prompt Builder & Generator" comes into play.
            </p>
            <p>
              Our tool is designed to bridge the gap between your raw ideas and the sophisticated capabilities of AI models. Whether you are a writer, developer, marketer, or researcher, you can simply input your core objective, and the tool will transform it into a highly structured, professional prompt. This ensures you extract the absolute best performance from your chosen AI model.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Developer Seeking a Bug Fix:</strong> Instead of asking "fix this code", set the Role to "Senior Software Engineer", Task to "Debug an authentication bug", and Format to "Step-by-step with code examples". You'll get clean, fully explained, and modular code.</li>
              <li style={{ marginBottom: "8px" }}><strong>Marketer Launching a Product:</strong> Choose Role: "Marketing Strategist", Tone: "Creative", and Format: "Table format". The AI will generate a structured week-by-week spreadsheet of tasks rather than a block of generic text.</li>
              <li style={{ marginBottom: "8px" }}><strong>Technical Writer Summarizing Data:</strong> Select Role "Data Scientist" and Tone "Academic". This forces the AI to avoid fluffy, colloquial language and stick to objective, precise terminology when summarizing research or charts.</li>
              <li style={{ marginBottom: "8px" }}><strong>Decision Making & Financials:</strong> Set Role to "Financial Advisor", Task to "Compare renting vs buying a house", and Format to "Pros and cons". The output will be neatly divided for an objective evaluation.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Principles of Prompt Engineering</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              This tool is built upon the best practices of AI Prompt Engineering. It automatically incorporates: <strong>Role-playing</strong> (to lock the AI into specific domain knowledge), <strong>"Chain of Thought" reasoning</strong> (by asking the AI to think step-by-step to drastically reduce hallucinations), and <strong>Strict formatting rules</strong>.
            </p>

            <h3>Why is Prompt Engineering Crucial?</h3>
            <p>
              AI language models act as mirrors to the instructions they receive. If a prompt is vague, the response will likely be generic. By carefully engineering a prompt, you can define:
            </p>
            <ul>
              <li><strong>Context:</strong> Providing the necessary background information so the AI understands the precise goal.</li>
              <li><strong>Role:</strong> Instructing the AI to adopt a specific persona or expertise (e.g., senior software engineer, marketing strategist).</li>
              <li><strong>Format:</strong> Specifying the desired output structure, whether it be a table, bullet points, paragraphs, or raw code.</li>
            </ul>
            <p>
              By utilizing our AI Prompt Generator, you save hours of trial and error, instantly receiving an optimized prompt tailored to your exact specifications.
            </p>
            <h3>How to Maximize Your Results</h3>
            <p>
              To achieve truly impressive outcomes, always strive for clarity and specificity in your initial description. Clearly state the context and your end goal. The tool will handle the heavy lifting by formatting and structuring the prompt in a way that AI models can easily parse and execute with high accuracy. Elevate your AI productivity today!
            </p>
          </>
        )}
      </article>
      <FAQSchema faqs={faqs} />
    </div>
  );
}
