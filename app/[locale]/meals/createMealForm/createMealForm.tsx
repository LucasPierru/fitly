'use client';

import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CameraIcon, Minus, Plus, X, XIcon } from 'lucide-react';
import { CheckedState } from '@radix-ui/react-checkbox';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';
import {
  getIngredientInformations,
  getIngredientsAutocomplete
} from '@/requests/ingredient';
import { calculateMacros, capitalizeWord } from '@/utils/utils';
import Modal from '@/components/modal/modal';
import { createMeal } from '@/requests/meal';
import { Button } from '@/components/ui/button';
import { formMealSchema } from '@/lib/validation/meal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { IIngredient } from '@/types';

const CreateMealForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState<Record<string, IIngredient[]>>(
    {}
  );
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const defaultIngredient = {
    id: '',
    name: '',
    quantity: 0,
    unit: '',
    nutrition: {
      nutrients: []
    }
  };

  const t = useTranslations('Common');

  const schema = formMealSchema(t);

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      image: {} as FileList,
      description: '',
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      ingredients: [],
      instructions: [],
      isPublic: false,
      cookingMinutes: 0,
      preparationMinutes: 0,
      servings: 0
    }
  });

  const instructions = form.getValues('instructions');

  const defaultInstruction = {
    name: '',
    step: instructions && instructions.length > 0 ? instructions.length + 1 : 1
  };

  const fileRef = form.register('image');

  const { control, handleSubmit, reset, setValue } = form;

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove
  } = useFieldArray({
    control,
    name: 'ingredients'
  });

  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove
  } = useFieldArray({
    control,
    name: 'instructions'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let ingredientsInformation: IIngredient[] = [];
    if (data.ingredients) {
      ingredientsInformation = await Promise.all(
        data.ingredients?.map(async (ingredient) => {
          const info = await getIngredientInformations(
            ingredient.id,
            ingredient.quantity,
            ingredient.unit
          );
          return info.ingredient;
        })
      ).then((result) => result.filter((ingredient) => ingredient !== null));
    }

    const nutrition = calculateMacros(
      ingredientsInformation!
        .map((ingredient) => ingredient.nutrients!.flat())
        .flat()
    );

    const pricePerServing = data.servings
      ? Math.round(
          ingredientsInformation.reduce(
            (acc, ingredient) => acc + ingredient.estimatedCost.value,
            0
          ) / data.servings
        ) / 100
      : 0;

    const newMeal = {
      title: data.title,
      image: {
        name: data.image.item(0)?.name!,
        data: image!,
        type: data.image.item(0)?.type!
      },
      description: data.description,
      preparationMinutes: data.preparationMinutes,
      cookingMinutes: data.cookingMinutes,
      pricePerServing,
      servings: data.servings,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      glutenFree: data.glutenFree,
      dairyFree: data.dairyFree,
      veryHealthy: data.veryHealthy,
      cheap: data.cheap,
      veryPopular: data.veryPopular,
      sustainable: data.sustainable,
      nutrition,
      ingredients:
        data.ingredients?.map((ingredient) => ({
          ingredient: ingredient.id,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        })) ?? [],
      instructions: data.instructions,
      isPublic: data.isPublic,
      isApproved: false
    };
    const { meal } = await createMeal(newMeal);
    router.refresh();
  };

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onChange = async (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) => {
    form.setValue(`ingredients.${index}.name`, event.target.value);
    if (event.target.value.length > 3) {
      const data = await getIngredientsAutocomplete(event.target.value);
      if (data.ingredients) {
        const ing = data.ingredients;
        setIngredients((currentState) => ({ ...currentState, [id]: ing }));
      }
    } else if (
      event.target.value.length <= 3 &&
      ingredients[id] &&
      ingredients[id].length !== 0
    ) {
      setIngredients({});
    }
  };

  const onSelectIngredient = async (index: number, ingredient: IIngredient) => {
    const { _id, name, alternateUnits } = ingredient;

    setValue(`ingredients.${index}.id`, _id.toString());
    setValue(`ingredients.${index}.name`, capitalizeWord(name));
    setValue(`ingredients.${index}.alternateUnits`, alternateUnits);

    setIngredients({});
  };

  const checkboxes: { name: keyof Inputs; label: string }[] = [
    {
      name: 'vegetarian',
      label: 'Vegetarian'
    },
    {
      name: 'vegan',
      label: 'Vegan'
    },
    {
      name: 'glutenFree',
      label: 'Gluten Free'
    },
    {
      name: 'dairyFree',
      label: 'Dairy Free'
    },
    {
      name: 'veryHealthy',
      label: 'Very Healthy'
    },
    {
      name: 'cheap',
      label: 'Cheap'
    },
    {
      name: 'veryPopular',
      label: 'Very Popular'
    },
    {
      name: 'sustainable',
      label: 'Sustainable'
    },
    {
      name: 'isPublic',
      label: 'Make Public'
    }
  ];

  return (
    <>
      <Button
        type="button"
        variant="default"
        size="lg"
        className="text-white"
        onClick={onOpen}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Meal
      </Button>
      <Modal isOpen={isOpen}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create New Recipe</h2>
          <Button
            type="button"
            onClick={onClose}
            size="icon"
            className="rounded-full"
            variant="ghost"
          >
            <X className="h-5 w-5" />{' '}
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)] scrollbar scrollbar-smooth">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="relative w-full min-h-48 mb-2">
                        <Image
                          src={image ?? '/defaultImage.jpg'}
                          alt="default image"
                          fill
                          className="absolute w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute w-full h-full object-cover rounded-md bg-black/30" />
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
                          {image && (
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => {
                                setImage(null);
                                setValue('image', {} as FileList);
                              }}
                              className="h-full w-full px-4 py-2"
                            >
                              <XIcon className="min-h-6 min-w-6" />
                            </Button>
                          )}
                          <FormLabel
                            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary/90 transition-[background-color]"
                            htmlFor="image"
                          >
                            <CameraIcon className="h-6 w-6" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="image"
                              type="file"
                              className="hidden"
                              {...fileRef}
                              onChange={(event) => {
                                fileRef.onChange(event);
                                if (event.target.files) {
                                  const file = event.target.files[0];
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    const target = e.target as FileReader;
                                    setImage(target.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        type="text"
                        {...field}
                        className="mb-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea id="description" {...field} className="mb-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name="preparationMinutes"
                  render={({ field }) => (
                    <FormItem className="gap-2">
                      <FormLabel className="line-clamp-1 h-fit">
                        Preparation time (min)
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="preparationMinutes"
                          type="number"
                          {...field}
                          className="mb-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="cookingMinutes"
                  render={({ field }) => (
                    <FormItem className="gap-2">
                      <FormLabel className="line-clamp-1 h-fit">
                        Cooking time (min)
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cookingMinutes"
                          type="number"
                          {...field}
                          className="mb-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem className="gap-2">
                      <FormLabel className="line-clamp-1 h-fit">
                        Servings
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="servings"
                          type="number"
                          {...field}
                          className="mb-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="ingredients"
                render={() => {
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <FormLabel className="block text-base">
                          Ingredients
                        </FormLabel>
                        <Button
                          type="button"
                          onClick={() => ingredientAppend(defaultIngredient)}
                          variant="outline"
                          className="border-primary text-primary hover:text-primary"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Ingredient
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {ingredientFields.map((ingredient, index) => (
                          <div
                            key={ingredient.id}
                            className="grid md:grid-cols-9 items-start gap-2"
                          >
                            <div className="relative col-span-4">
                              <FormField
                                control={control}
                                name={`ingredients.${index}.name`}
                                render={() => (
                                  <FormItem className="gap-2">
                                    <FormLabel className="h-[22px]">
                                      Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id={`ingredients.${index}.name`}
                                        placeholder="E.g. Chicken breast"
                                        type="text"
                                        value={
                                          form.getValues().ingredients?.[index]
                                            .name
                                        }
                                        onChange={(e) =>
                                          onChange(e, ingredient.id, index)
                                        }
                                        className="mb-2"
                                        autoComplete="off"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {ingredients[ingredient.id] &&
                                ingredients[ingredient.id].length > 0 && (
                                  <div className="z-50 max-h-32 overflow-y-scroll scrollbar absolute top-16 w-full gap-2 flex flex-col bg-background rounded-b-xl border border-border group-focus-within:border-b-white group-focus-within:border-x-white group-focus-within:text-red">
                                    {ingredients[ingredient.id].map((ingr) => {
                                      return (
                                        <Button
                                          // eslint-disable-next-line no-underscore-dangle
                                          key={ingr._id.toString()}
                                          type="button"
                                          variant="ghost"
                                          className="text-left block hover:bg-black/5 w-full rounded-none last:rounded-b-xl truncate min-h-fit"
                                          onClick={() => {
                                            onSelectIngredient(index, ingr);
                                          }}
                                        >
                                          {capitalizeWord(ingr.name)}
                                        </Button>
                                      );
                                    })}
                                  </div>
                                )}
                            </div>
                            <FormField
                              control={control}
                              name={`ingredients.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem className="gap-2 col-span-2">
                                  <FormLabel className="h-[22px]">
                                    Quantity
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id={`ingredients.${index}.quantity`}
                                      type="number"
                                      {...field}
                                      className="mb-2"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name={`ingredients.${index}.unit`}
                              render={({ field }) => (
                                <FormItem className="gap-2 col-span-2">
                                  <FormLabel className="h-[22px]">
                                    Unit
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a unit" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="g">g</SelectItem>
                                      {form
                                        .getValues()
                                        .ingredients?.[
                                          index
                                        ].alternateUnits?.map((unit) => <SelectItem value={unit.unit}>{unit.unit}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              onClick={() => ingredientRemove(index)}
                              variant="destructive"
                              size="icon"
                              className="rounded-full mt-7 justify-self-end"
                            >
                              {' '}
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </div>
                  );
                }}
              />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="block text-base">Instructions</Label>
                  <Button
                    type="button"
                    onClick={() => {
                      instructionAppend(defaultInstruction);
                    }}
                    variant="outline"
                    className="border-primary text-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                <div className="space-y-2">
                  {instructionFields.map((instruction, index) => (
                    <div
                      key={instruction.id}
                      className="flex gap-2 items-start justify-center"
                    >
                      <span className="text-gray-500">{index + 1}.</span>
                      <FormField
                        control={control}
                        name={`instructions.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1 gap-2">
                            <FormControl>
                              <Input
                                id={`instructions.${index}.name`}
                                type="text"
                                {...field}
                                autoComplete="off"
                                placeholder="E.g. Salt and pepper the chicken"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          instructionRemove(index);
                        }}
                        variant="destructive"
                        size="icon"
                        className="rounded-full"
                      >
                        {' '}
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>More options</AccordionTrigger>
                  <AccordionContent className="flex flex-wrap gap-4">
                    {checkboxes.map((checkbox) => (
                      <FormField
                        control={form.control}
                        key={checkbox.name}
                        name={checkbox.name}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key="isPublic"
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value as CheckedState}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked)
                                  }
                                  name={checkbox.name}
                                  className="!text-base"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {checkbox.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex justify-end gap-3">
                <Button type="button" onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Recipe</Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateMealForm;
