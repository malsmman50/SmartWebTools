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
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <PromptGeneratorClient lang={lang} dict={dict} />
      
      <SoftwareSchema 
        name={isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator"}
        description={isAr ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini" : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini"}
        applicationCategory="UtilityApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/prompt-generator`}
      />
      <FAQSchema faqs={faqs} />
      
      <article className="prose lg:prose-xl mx-auto mt-12 dark:prose-invert">
        {isAr ? (
          <>
            <h2>الدليل الشامل لاستخدام مهندس ومولد أوامر الذكاء الاصطناعي</h2>
            <p>
              في عصر التطور التكنولوجي المتسارع، أصبح التفاعل مع نماذج الذكاء الاصطناعي مثل <strong>ChatGPT</strong> و <strong>Claude</strong> و <strong>Gemini</strong> جزءاً أساسياً من عمل الكثيرين. إلا أن الحصول على إجابات دقيقة واحترافية من هذه النماذج يتطلب مهارة تُعرف باسم <em>هندسة الأوامر</em> (Prompt Engineering). وهنا يأتي دور أداتنا المتقدمة: "مهندس ومولد أوامر الذكاء الاصطناعي".
            </p>
            <p>
              تم تصميم هذه الأداة لتكون بمثابة جسر بين أفكارك وبين قدرات الذكاء الاصطناعي. سواء كنت كاتباً، مبرمجاً، مسوقاً، أو باحثاً، يمكنك ببساطة إدخال فكرتك الأساسية، وستقوم الأداة بتحويلها إلى أمر برمجي متكامل ومهيكل بأسلوب احترافي، يضمن لك استخراج أفضل أداء من نموذج الذكاء الاصطناعي المستهدف.
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
    </div>
  );
}
