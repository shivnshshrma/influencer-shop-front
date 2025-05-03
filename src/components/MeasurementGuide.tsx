
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const MeasurementGuide = () => {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
      <h3 className="font-medium text-lg mb-2">How to Take Measurements</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="height">
          <AccordionTrigger>Height</AccordionTrigger>
          <AccordionContent>
            Stand straight against a wall without shoes. Mark the wall at the top of your head and measure from the floor to this mark.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="chest">
          <AccordionTrigger>Chest/Bust</AccordionTrigger>
          <AccordionContent>
            Measure around the fullest part of your chest/bust, keeping the tape measure parallel to the floor.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="waist">
          <AccordionTrigger>Waist</AccordionTrigger>
          <AccordionContent>
            Measure around your natural waistline, which is the narrowest part of your torso, typically above your belly button.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hip">
          <AccordionTrigger>Hip</AccordionTrigger>
          <AccordionContent>
            Measure around the fullest part of your hips, typically around 7-9 inches below your natural waistline.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shoe">
          <AccordionTrigger>Shoe Size</AccordionTrigger>
          <AccordionContent>
            Measure your foot from the back of your heel to the tip of your longest toe while standing.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MeasurementGuide;
